import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import MembershipJoin from "./MembershipJoin";

const state = vi.hoisted(() => ({ user: null as { email: string } | null, invoke: vi.fn(), location: "" }));
vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ user: state.user }) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: state.invoke } } }));
function LocationCapture() { const l = useLocation(); state.location = l.pathname + l.search; return null; }
afterEach(() => { cleanup(); state.user = null; state.invoke.mockReset(); });

describe("membership pass selection", () => {
  it("starts without a selected pass and selects only the clicked pass", () => {
    render(<MemoryRouter><MembershipJoin /></MemoryRouter>);
    const choices = screen.getAllByRole("radio");
    const submit = screen.getByRole("button", { name: /continue|join/i });
    expect(choices).toHaveLength(3);
    choices.forEach(choice => expect(choice).toHaveAttribute("aria-checked", "false"));
    expect(submit).toBeDisabled();
    fireEvent.click(choices[1]);
    expect(choices[1]).toHaveAttribute("aria-checked", "true");
    expect(choices[0]).toHaveAttribute("aria-checked", "false");
    expect(choices[2]).toHaveAttribute("aria-checked", "false");
    expect(submit).toBeEnabled();
    fireEvent.click(choices[2]);
    expect(choices[1]).toHaveAttribute("aria-checked", "false");
    expect(choices[2]).toHaveAttribute("aria-checked", "true");
  });
});

describe("membership billing choice journey", () => {
  it("remembers the featured yearly option through sign-in", () => {
    render(<MemoryRouter><MembershipJoin /><LocationCapture /></MemoryRouter>);
    fireEvent.click(screen.getAllByRole("radio")[1]);
    const next = new URLSearchParams(state.location.split("?")[1]).get("next");
    expect(next).toBe("/memberships?tier=lux-plus&billing=yearly#join");
  });
  it("remembers monthly when the family chooses it", () => {
    render(<MemoryRouter><MembershipJoin /><LocationCapture /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Monthly" }));
    fireEvent.click(screen.getAllByRole("radio")[0]);
    expect(new URLSearchParams(state.location.split("?")[1]).get("next")).toBe("/memberships?tier=little-lux&billing=monthly#join");
  });
  for (const period of ["monthly", "yearly"] as const) {
    it(`submits the restored ${period} choice with the child's details`, async () => {
      state.user = { email: "membership-check@example.test" };
      state.invoke.mockResolvedValue({ data: null, error: null });
      render(<MemoryRouter initialEntries={[`/memberships?tier=lux-plus&billing=${period}`]}><MembershipJoin /></MemoryRouter>);
      fireEvent.change(screen.getByLabelText("Child's full name"), { target: { value: "Test Child" } });
      fireEvent.change(screen.getByLabelText("Child's date of birth"), { target: { value: "2022-01-01" } });
      fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Test Parent" } });
      fireEvent.submit(screen.getByRole("button", { name: "Continue to secure payment" }).closest("form") as HTMLFormElement);
      await waitFor(() => expect(state.invoke).toHaveBeenCalledWith("membership", { body: {
        action: "join", tier: "lux-plus", billingPeriod: period, childName: "Test Child", childDob: "2022-01-01", parentName: "Test Parent", parentPhone: "",
      } }));
    });
  }
});
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import MembershipJoin from "./MembershipJoin";

vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ user: null }) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: vi.fn() } } }));

describe("membership pass selection", () => {
  it("starts without a selected pass and selects only the clicked pass", () => {
    render(<MemoryRouter><MembershipJoin /></MemoryRouter>);
    const choices = screen.getAllByRole("radio");
    const submit = screen.getByRole("button");
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
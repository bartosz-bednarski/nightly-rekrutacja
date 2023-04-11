import type { Meta, StoryObj } from "storybook-solidjs";
import { within, userEvent } from "@storybook/testing-library";
import App from "../App";
import HomeForm from "../components/HomeForm";

const meta = {
  title: "Home/HomeForm",
  component: HomeForm,
} satisfies Meta<typeof HomeForm>;

export default meta;
type Story = StoryObj<typeof meta>;
export const LoggedOut: Story = {};

// More on interaction testing: https://storybook.js.org/docs/7.0/solid/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole("button", {
      name: /Log in/i,
    });
    await userEvent.click(loginButton);
  },
};

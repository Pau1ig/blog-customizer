import type { Meta, StoryObj } from '@storybook/react';

import { StoryDecorator } from './StoryDecorator';

const meta = {
  component: StoryDecorator,
} satisfies Meta<typeof StoryDecorator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
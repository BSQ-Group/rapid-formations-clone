import type { Meta, StoryObj } from '@storybook/react'
import Text from './index'

const text = 'Lorem ipsum dolor salmat'

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Base Components/Text',
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'primary',
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'primaryBold', 'secondaryBold'],
      control: { type: 'radio' },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark:text-white">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Text>

export const Headline9xl: Story = {
  args: { text, textStyle: 'headline-9xl', as: 'h1' },
}
export const Headline8xl: Story = {
  args: { text, textStyle: 'headline-8xl', as: 'h1' },
}
export const Headline7xl: Story = {
  args: { text, textStyle: 'headline-7xl', as: 'h1' },
}
export const Headline6xl: Story = {
  args: { text, textStyle: 'headline-6xl', as: 'h1' },
}
export const Headline5xl: Story = {
  args: { text, textStyle: 'headline-5xl', as: 'h2' },
}
export const Headline4xl: Story = {
  args: { text, textStyle: 'headline-4xl', as: 'h2' },
}
export const Headline3xl: Story = {
  args: { text, textStyle: 'headline-3xl', as: 'h2' },
}
export const Headline2xl: Story = {
  args: { text, textStyle: 'headline-2xl', as: 'h3' },
}
export const HeadlineXl: Story = {
  args: { text, textStyle: 'headline-xl', as: 'h3' },
}

export const Statistic8xl: Story = {
  args: { text: '£9.99', textStyle: 'statistic-8xl' },
}
export const Statistic7xl: Story = {
  args: { text: '£9.99', textStyle: 'statistic-7xl' },
}
export const Statistic5xl: Story = {
  args: { text: '£9.99', textStyle: 'statistic-5xl' },
}

export const BodyLarge: Story = {
  args: { text, textStyle: 'body-lg' },
}
export const BodyBase: Story = {
  args: { text, textStyle: 'body-base' },
}
export const BodySmall: Story = {
  args: { text, textStyle: 'body-sm' },
}
export const BodyExtraSmall: Story = {
  args: { text, textStyle: 'body-xs' },
}

export const DisplayLarge: Story = {
  args: { text, textStyle: 'display-lg', variant: 'primaryBold' },
}
export const DisplaySmall: Story = {
  args: { text, textStyle: 'display-sm', variant: 'primaryBold' },
}
export const H1: Story = {
  args: { text, textStyle: 'h1' },
}
export const H2: Story = {
  args: { text, textStyle: 'h2' },
}
export const H3: Story = {
  args: { text, textStyle: 'h3' },
}
export const H4: Story = {
  args: { text, textStyle: 'h4' },
}
export const H5: Story = {
  args: { text, textStyle: 'h5' },
}

export const Paragraph: Story = {
  args: { text, textStyle: 'p' },
}

export const ParagraphSmall: Story = {
  args: { text, textStyle: 'p-sm' },
}

export const Label: Story = {
  args: { text, textStyle: 'label' },
}

export const Link: Story = {
  args: { text, textStyle: 'a' },
}

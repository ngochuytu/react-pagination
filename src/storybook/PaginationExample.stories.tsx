import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PaginationExample from '../examples/PaginationExample/PaginationExample';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Examples/Pagination',
  component: PaginationExample,
} as ComponentMeta<typeof PaginationExample>;

const Template: ComponentStory<typeof PaginationExample> = (args) => <PaginationExample {...args} />;

export const PaginationExampleStory = Template.bind({});

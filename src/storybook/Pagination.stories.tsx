import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from '../components/Pagination/Pagination';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />;

export const PaginationEnableInitialOnPageChange = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PaginationEnableInitialOnPageChange.args = {
  totalPages: 100,
};

export const PaginationDisableInitialOnPageChange = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PaginationDisableInitialOnPageChange.args = {
  totalPages: 100,
  disableInitialOnPageChangeCall: true,
};

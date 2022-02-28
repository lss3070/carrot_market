import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "../../components/button";

export default{
    component:Button,
    title:'Components/Button'
} as ComponentMeta<typeof Button>

const Template:ComponentStory<typeof Button> = (args) =><Button {...args}/>

export const CustomButton= Template.bind({});
CustomButton.args={
    large:false,
    text:"Button"
}


import { ComponentMeta, ComponentStory } from "@storybook/react";
import Message from "../../components/message";




export default{
    component:Message,
    title:'Components/Message',
} as ComponentMeta<typeof Message>

const Template:ComponentStory<typeof Message> = (args) =><Message {...args}/>

export const CustomInput= Template.bind({});
CustomInput.args={
    message:'Message',
    reversed:false,
}


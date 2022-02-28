import { ComponentMeta, ComponentStory } from "@storybook/react";
import TextArea from "../../components/textarea";

export default{
    component:TextArea,
    title:'Components/TextArea',

} as ComponentMeta<typeof TextArea>

const Template:ComponentStory<typeof TextArea>=(args)=><TextArea {...args}/>

export const CustomTextArea=Template.bind({});
CustomTextArea.args={
    label:'label',
    name:'name',
}

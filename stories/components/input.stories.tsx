import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input, { InputKind } from "../../components/input";

export default{
    component:Input,
    title:'Components/Input',
    argTypes:{
        kind:{
            control:{
                type:'select',
                options:[InputKind.text,InputKind.phone,InputKind.price],
                labels:["Text",'Phone','Price']
            }
        }
    }
} as ComponentMeta<typeof Input>

const InputTemplate:ComponentStory<typeof Input> = (args) =><Input {...args}/>
export const CustomInput= InputTemplate.bind({});
CustomInput.args={
    label:'label',
    name:'name',
    kind:0
}

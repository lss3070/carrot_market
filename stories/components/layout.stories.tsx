import { ComponentMeta, ComponentStory } from "@storybook/react";
import Layout from "../../components/layout";
import {MemoryRouter,Route} from 'react-router';


export default{
    component:Layout,
    title:'Components/Layout',
} as ComponentMeta<typeof Layout>

const Template:ComponentStory<typeof Layout> = (args) =><Layout {...args}/>

export const CustomLayout= Template.bind({});
CustomLayout.args={
    title:'test',
    canGoBack:false,
    hasTabBar:true,
}

export const HomeLayout =()=>{
    const props={
        title:'test',
        canGoBack:false,
        hasTabBar:true,
    }
    return (
        <MemoryRouter>
            {/* <Route component={(routerProps:any)=><Layout {...routerProps}{...props}/>}
            path='/'
            /> */}
        </MemoryRouter>
    )
}

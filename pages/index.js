import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Login from "./components/Login"
import {minusCount, plusCount, setUserInfo} from "../store/modules/layoutSlice";

export default function Home() {

    const { userInfo } = useSelector((state) => state.user)

    const router = useRouter();

    return (
        <>
        {userInfo &&
            <div>
                Home
            </div>
        }
            {!userInfo && <Login/>}
        </>

    );

}

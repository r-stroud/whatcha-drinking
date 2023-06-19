import { SubMenuView } from "../subMenu/SubMenuView"
import { FriendRequestView } from "./FriendRequestsView"
import "./Social.css"

export const SocialView = () => {
    const currentLocation = "social"


    return (<>
        <SubMenuView
            location={currentLocation} />
        <FriendRequestView />
    </>)
}
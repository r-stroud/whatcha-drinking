export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("wd_user"))
}
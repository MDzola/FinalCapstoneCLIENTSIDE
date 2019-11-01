import { useState } from "react"

const useSimpleAuth = () => {

    const [loggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = () =>
        loggedIn || localStorage.getItem("wheresmyspares_token") !== null

    const register = userInfo => {
        return fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(res => {
                if ("token" in res) {
                    localStorage.setItem( "wheresmyspares_token", res.token )
                    localStorage.setItem("employee_id", res.employee_id)
                    setIsLoggedIn(true)
                }
            })
    }

    const login = credentials => {
        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem( "wheresmyspares_token", res.token )
                    localStorage.setItem("employee_id", res.employee_id)
                    setIsLoggedIn(true)
                }
            })
    }

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("wheresmyspares_token")
        localStorage.removeItem("employee_id")
    }

    return { isAuthenticated, logout, login, register }
}

export default useSimpleAuth

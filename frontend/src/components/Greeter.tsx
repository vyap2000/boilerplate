import React, { useContext, useEffect, useState } from 'react';
import { GreeterContext } from "./../hardhat/SymfoniContext";

interface Props { }

export const Greeter: React.FC<Props> = () => {
    const greeter = useContext(GreeterContext)
    const [message, setMessage] = useState("");
    const [inputGreeting, setInputGreeting] = useState("");
    useEffect(() => {
        const doAsync = async () => {
            if (!greeter.instance) return
            console.log("Greeter is deployed at ", greeter.instance.address)
            setMessage(await greeter.instance.greet())

        };
        doAsync();
    }, [greeter])

    const handleSetGreeting = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!greeter.instance) throw Error("Greeter instance not ready")
        if (greeter.instance) {
            const tx = await greeter.instance.setGreeting(inputGreeting)
            console.log("setGreeting tx", tx)
            await tx.wait()
            console.log("New greeting mined, result: ", await greeter.instance.greet())
        }
    }
    return (
        <div>
            <p>{message}</p>
            <input className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onChange={(e) => setInputGreeting(e.target.value)}></input>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleSetGreeting(e)}>Set greeting</button>
        </div>
    )
}
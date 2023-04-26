import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Card from 'react-bootstrap/Card';
import {useEffect, useState} from "react";

function ParagrapheContentLeft({text = '...'}) {
    return (
        <>
            Moi
            <Card style={{width: '50%', backgroundColor: '#9BA4B5', color: 'white'}} body>{text}</Card>
        </>
    )
}

function ParagrapheContentRight({text = '...'}) {
    return (

        <>
            <div style={{marginLeft: '50%'}}>Notre Robot agent</div>
            <Card style={{width: '50%', marginLeft: '50%', backgroundColor: '#394867', color: 'white'}}
                  body>{text}</Card>
        </>
    )
}

function ButtonsExample({chatsList, setChatList}) {
    const [inputValue, setInputValue] = useState('');
    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Envoyez votre message"
                    aria-label="Envoyez votre message"
                    aria-describedby="basic-addon2"
                    onChange={(event => {
                        console.log('lolali')
                        console.log(event.target.value)
                        setInputValue(event.target.value)
                    })}
                />
                <Button onClick={() => {
                    setChatList(chatsList => [...chatsList, inputValue])
                }} variant="outline-secondary" id="button-addon2">
                    Button
                </Button>
            </InputGroup>
        </>
    );
}

const Conversation = ({chatsList}) => {
    console.log("chatsList")
    console.log(chatsList)
    let i = 0;
    return (
        <>
            {
                chatsList.map(chat => {
                    return (
                        <>
                            <ParagrapheContentLeft text={chat}/>
                            <ParagrapheContentRight text='ton papouné'/>
                        </>
                    )
                })
            }
        </>
    )
}

const Accueil = () => {
    const [chatsList, setChatsList] = useState([]);
    // chatsList.push('salut');
    // chatsList.push('ton beau père')

    useEffect(() => {
        fetch('http://82.165.75.208:8083/morpion/chat/talk', {
            method: 'POST',
            headers: {
                "access-control-allow-origin" : "*",
            },
            body: 'comment tu vas ?'
        })
            .then(response => {
                console.log('par pitié macron')
                console.log(response)
            })
    }, [chatsList])
    return (
        <div style={{backgroundColor: '#F1F6F9', height: '100vh'}}>
            <Conversation chatsList={chatsList} />
            <ButtonsExample chatsList={chatsList} setChatList={setChatsList}/>
        </div>
    )
};

export default Accueil;

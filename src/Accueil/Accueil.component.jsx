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

function ButtonsExample({setDataIsReady,setBotList, botList, setChatList, inputValue, setInputValue}) {

    const testosta = () => {
        setChatList(chatsList => [...chatsList, inputValue]);
        setDataIsReady(false);

        console.log('on est dedans')
        if(inputValue != '') {
            postData('http://82.165.75.208:8083/morpion/chatbot/gpt3/chat/answer', inputValue)
                .then((data) => {
                    setBotList(botList => [...botList, data])
                    botList.push(data);
                    console.log(botList);
                    console.log('new data');
                    console.log(data);
                })
                .finally(() => {
                    setDataIsReady(true);
                });
        }
    }

    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Envoyez votre message"
                    aria-label="Envoyez votre message"
                    aria-describedby="basic-addon2"
                    onChange={(event => {
                        setInputValue(event.target.value)
                    })}
                />
                <Button onClick={() => {
                    testosta();
                }} variant="outline-secondary" id="button-addon2">
                    Button
                </Button>
            </InputGroup>
        </>
    );
}

const Conversation = ({chatsList, botList, dataIsReady}) => {
    let i = 0;
    return (
        <>
            {
                chatsList.map(chat => {
                    return (
                        <>
                            <ParagrapheContentLeft text={chat}/>
                            {dataIsReady && (
                                <ParagrapheContentRight text={botList[i]} />
                            )}
                        </>
                    )
                })
            }
        </>
    )
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function postData(url = "", data = '') {

    console.log('la data')
    console.log(data)
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "text/plain;charset=UTF-8",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data.toString(), // body data type must match "Content-Type" header
    });
    return response.text(); // parses JSON response into native JavaScript objects
}

const Accueil = () => {
    const [dataIsReady, setDataIsReady] = useState(true);
    const [chatsList, setChatsList] = useState([]);
    const [botList, setBotList] = useState([]);
    const [inputValue, setInputValue] = useState('');

    return (
        <div style={{backgroundColor: '#F1F6F9', height: '100vh'}}>
            <Conversation chatsList={chatsList} botList={botList} dataIsReady={dataIsReady} />
            <ButtonsExample setBotList={setBotList} botList={botList} setDataIsReady={setDataIsReady} inputValue={inputValue} setInputValue={setInputValue} setChatList={setChatsList} />
        </div>
    )
};

export default Accueil;

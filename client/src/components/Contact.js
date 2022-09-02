import styled from 'styled-components';
import { useRef, useState } from 'react';
import emailjs from "emailjs-com";
import { useAuth0 } from '@auth0/auth0-react';
import boKaapBackground from "../assets/bo-kaap-background.JPG";

const Contact = () => {

    const form = useRef();

    const { isAuthenticated, user } = useAuth0();

    const [sendSuccess, setSendSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // params: ('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
        emailjs.sendForm("gmail", "template_u4cblfw", form.current, "wVbfUlRQ5_wlcZvJ0")
            .then((result) => {
                setSendSuccess(true);
            }, (error) => {
                alert("An error has occurred. Please try again!");
            });
    }

    return (
        <Container>
            {sendSuccess && <Confirmation><p>Thank you for contacting me. I will be in touch as soon as possible!</p></Confirmation>}
            <Form onSubmit={handleSubmit} ref={form} style={{display: sendSuccess === true && "none"}}>
                <Title>Contact Me</Title>
                <Description>Drop me a line and I'll get back to you as soon as possible!</Description>
                <InputDiv>
                    <label required>Name: </label>
                    {isAuthenticated && user.name
                        ? <Input type="name" placeholder="Name" name="name" value={user.name} required />
                        : <Input type="name" placeholder="Name" name="name" required />
                    }
                </InputDiv>
                <InputDiv>
                    <label>Email: </label>
                    {isAuthenticated && user.email
                        ? <Input type="email" placeholder="Email" name="email" value={user.email}required />
                        : <Input type="email" placeholder="Email" name="email" required />
                    }
                </InputDiv>
                <InputDiv>
                    <label>Comments:</label>
                    <TextArea placeholder="Enter your comments here!" name="comments" required></TextArea>
                </InputDiv>
                <InputDiv>
                    <Submit type="submit" />
                </InputDiv>
            </Form>
            <CoverShade />
            <Background src={boKaapBackground} alt="Bo Kaap background"/>
        </Container>
    )
}

const Container = styled.div`
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Confirmation = styled.div`
    z-index: 6;
    height: 100%;
    width: 40%;
    text-align: center;
    display: flex;
    align-items: center;
    font-size: 32px;
    color: white;

    @media (max-width: 855px) {
        width: 80%
    }

    @media (max-height: 425px) {
        align-items: flex-end;
    }
`;

const Form = styled.form`
    z-index: 3;
    padding: 25px;
    max-width: 500px;
    height: 50px;
    font-size: 18px;
    color: white;
    text-shadow: 1px 1px black;
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: 42px;
    color: white;
    text-align: center;

    @media (max-width: 500px) {
        font-size: 28px;
    }
`;

const Description = styled.p`
    font-size: 20px;
    color: white;
    text-align: justify;
    margin-top: 20px;

    @media (max-width: 500px) {
        font-size: 20px;
        margin-bottom: 20px;
    }
`;

const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    margin-top: 25px;

    @media (max-width: 650px) {
        font-size: 20px;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 30px;
    padding: 5px;
    display: flex;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    resize: none;

    @media (max-width: 650px) {
        font-size: 20px;
        height: 30px;
    }
`;

const TextArea = styled.textarea`
    height: 50px;
    font-size: 20px;
    padding: 5px;
    border: none;
    border-radius: 5px;

    @media (max-width: 650px) {
        font-size: 20px;
        height: 75px;
    }
`;

const Submit = styled.input`
    height: 45px;
    background-color: #999900;
    color: white;
    font-size: 22px;
    border: none;
    border-radius: 8px;

    :hover {
        cursor: pointer;
        opacity: 75%;
    }
`;

const CoverShade = styled.div`
    z-index: 2;
    position: fixed;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    background-color: black;
    opacity: 30%;
`;

const Background = styled.img`
    z-index: 1;
    position: fixed;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
`;

export default Contact;
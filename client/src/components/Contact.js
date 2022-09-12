import styled from 'styled-components';
import { useRef, useState } from 'react';
import emailjs from "emailjs-com";
import { useAuth0 } from '@auth0/auth0-react';
import boKaapBackground from "../assets/chefchaoun-bg.JPG";

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
                    {isAuthenticated && !user.name.includes("@")
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
                    <label>Message:</label>
                    <TextArea placeholder="Enter your message here" name="message" required></TextArea>
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
    justify-content: center;
`;

const Confirmation = styled.div`
    z-index: 6;
    height: 100%;
    width: 30%;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 32px;
    color: white;
    position: absolute;

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
    font-size: 18px;
    color: white;
    text-shadow: 1px 1px black;
    border-radius: 25px;
    position: absolute;
`;

const Title = styled.h1`
    font-size: 52px;
    color: white;
    text-align: center;
    margin-top: -5px;
    font-family: 'Forum', cursive;

    @media (max-width: 500px) {
        font-size: 36px;
    }
`;

const Description = styled.p`
    font-size: 24px;
    color: white;
    text-align: justify;
    margin-top: 20px;
    font-family: 'Forum', cursive;

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
    width: 98%;
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
    width: 98%;
    font-size: 20px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    font-family: "Open Sans", sans-serif;

    @media (max-width: 650px) {
        font-size: 20px;
        height: 75px;
    }
`;

const Submit = styled.input`
    height: 45px;
    width: 100%;
    background-color: navy;
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
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 20px;
    object-fit: cover;
    background-color: black;
    opacity: 50%;

    @media (max-width: 650px) {
        width: 100%;
    }
`;

const Background = styled.img`
    z-index: 1;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
`;

export default Contact;
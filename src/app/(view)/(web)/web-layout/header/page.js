"use client"
import Link from 'next/link';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';
import WebHome from '../../web_home/page';

const WebHeader = () => {

    const [categories, setCategories] = useState([])
    const [css, setCss] = useState([])


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}:5002/admin/admin_panel_settings`)
            .then(Response => Response.json())
            .then(data => setCategories(data))
    }, [])
    console.log(categories, 'categories')
    const filteredCategories = categories.filter(category => category.status === 1);
    console.log(filteredCategories[0]?.login_template_name, 'filteredCategories[0]?.admin_template')


    const loginTemplateNumber = filteredCategories[0]?.login_template_name
    const number = parseFloat(loginTemplateNumber)

    // console.log(`/admin/login${typeof(loginTemplateNumber)}`, 'loginTemplateNumber')

    const route = `/login${loginTemplateNumber}`

    console.log(route)



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const data = () => {
        localStorage.setItem('login', route)
    }


    return (
        <div >

            <Navbar expand="lg" className="bg-secondary">
                <Container>
                    <Navbar.Brand className='mb-2 mt-2' >React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto  mt-1 gap-lg-5 gap-2 gap-md-2">
                            <Link href="/">Home</Link>
                            <Link href="/">Blogs</Link>
                            <Link href="/">About</Link>
                            <Link href="/Admin/dashboard" onClick={data}>Dashboard</Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Some text as placeholder. In real life you can have the elements you
                        have chosen. Like, text, images, lists, etc.
                    </Offcanvas.Body>
                </Offcanvas>
            </>

        </div>
    );
};

export default WebHeader;
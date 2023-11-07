import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import NotAvailable from '../components/NotAvailable';
import SelectGenres from '../components/SelectGenres';
import Slider from '../components/Slider';


export default function TVShows() {
    const [isScrolled, setIsScrolled] = useState(false);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!genres.length) dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
    }, [genresLoaded]);

    const [user, setUser] = useState(undefined);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) setUser(currentUser.uid);
        else navigate("/login");
    });

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };



    return (
        <Container>
            <div className='navbar'>
                <Navbar isScrolled={{ isScrolled }} />
            </div>
            <div className='data' >
                <SelectGenres genres={genres} type="tv" />
                {
                    movies.length ? <Slider movies={movies} /> : <NotAvailable type="TV show"/>
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;
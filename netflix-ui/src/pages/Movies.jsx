import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import Slider from '../components/Slider';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import NotAvailable from '../components/NotAvailable';
import SelectGenres from '../components/SelectGenres';

export default function Movies() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({type: "movies" }));
    }, [genresLoaded]);

    const [user, setUser] = useState(undefined);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setUser(currentUser.uid);
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
                <SelectGenres genres={genres} type="movie" />
                {
                    movies.length ? <Slider movies={movies} /> : <NotAvailable type="movie" />
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
      color: white;
      margin-top: 4rem;
    }
  }
`;
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import Header from './Header'
import ThemeToggle from './ThemeMode/ThemeToggle'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { lightTheme, darkTheme } from './ThemeMode/theme'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-family: sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;


function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  return (

    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Header />
      <Outlet />
    </ThemeProvider>

  )
}

export default Layout

const useHamburger = () => {
  const hamburgerNav = useState('hamburgerNav', () => {})
  const setHamburgerNav = (nav) => {
    hamburgerNav.value = nav
  }

  return {
    hamburgerNav,
    setHamburgerNav
  }
}

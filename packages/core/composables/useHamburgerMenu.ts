export const useHamburgerMenu = () => {
    const isHamburgerOpen = useState('isHamburgerOpen', () => false)

    return {
        isHamburgerOpen,
        onHamburgerOpen: () => { isHamburgerOpen.value = true },
        onHamburgerClose: () => { isHamburgerOpen.value = false }
    }
}

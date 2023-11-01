export const useHamburgerMenu = () => {
    const isHamburgerOpen = ref(false)

    return {
        isHamburgerOpen,
        onHamburgerOpen: () => { isHamburgerOpen.value = true },
        onHamburgerClose: () => { isHamburgerOpen.value = false }
    }
}

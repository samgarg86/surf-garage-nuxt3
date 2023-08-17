export const useSiteNav = () => {
  const { locale } = useI18n()
  const { getFirstEntryOfType } = useContentful()

  // const key = computed(()=> `siteNav-${locale.value}`)
  const siteNav = useState('sitenav')

  const forceFetch = async (loc) => {
    const { fields } = await getFirstEntryOfType('hamburgerMenu', loc)
    siteNav.value = fields
    console.log('Fetching site nav for locale', loc)
  }

  const fetchSiteNav = async () => {
    await forceFetch(locale.value)
  }

  return {
    siteNav: computed(() => siteNav.value),
    forceFetch,
    fetchSiteNav
  }
}

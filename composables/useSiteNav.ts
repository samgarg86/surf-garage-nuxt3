import {awaitExpression} from "@babel/types";

export const useSiteNav = () => {
  const { locale } = useI18n()
  const { getFirstEntryOfType } = useContentful()
  let siteNav = useState('siteNav')

  const fetchSiteNav = async () => {
    const { fields } = await getFirstEntryOfType('hamburgerMenu', locale.value)
    return fields
  }

  if (!siteNav.value || Object.keys(siteNav.value).length === 0) {
    fetchSiteNav().then((fields) => {
      siteNav = useState('siteNav', () => fields)
    })
  }

  return {siteNav: siteNav.value}
}

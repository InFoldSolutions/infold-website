
export let interests: string[] = []

if (typeof window !== "undefined")
  getInterests()

export function getInterests(): string[] {
  if (interests?.length > 0)
    return interests

  // @ts-ignore
  interests = localStorage.getItem("interests") ? JSON.parse(localStorage.getItem("interests")) : []

  return interests
}

export function addInterest(interest: string): string[] {
  if (interests.includes(interest))
    return interests

  interests.push(interest)

  saveInterests(interests)

  return interests
}

export function removeInterest(interest: string): string[] {
  if (!interests.includes(interest))
    return interests

  interests = interests.filter((item: string) => item !== interest)

  saveInterests(interests)

  return interests
}

export function saveInterests(interests: string[]) {
  localStorage.setItem("interests", JSON.stringify(interests));
}

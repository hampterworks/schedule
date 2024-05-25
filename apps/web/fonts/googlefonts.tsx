import {Holtwood_One_SC, Merriweather, Peralta, Roboto, Roboto_Slab} from "next/font/google";

export const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700', '900']
})

export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '400', '700', '900'],
})

export const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '400', '700']
})

export const holtwoodOneSC = Holtwood_One_SC({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400']
})

export const peralta = Peralta({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400']
})

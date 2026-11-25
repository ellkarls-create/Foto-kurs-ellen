import { WorkshopCard } from './WorkshopCard'

export default {
  title: 'Komponenter/Workshopkort',
  component: WorkshopCard,
  args: {
    title: 'Ta kontroll över din kamera!',
    duration: '5 h',
    price: '1200:-',
    description:
      'Under 5 timmar lär du dig att ta kontroll över din kamera! Arbetet sker i en liten grupp, vi använder oss av smarta metoder och går genom grunderna i fotografering.',
  },
  argTypes: {
    title: { control: 'text', name: 'Rubrik' },
    duration: { control: 'text', name: 'Längd' },
    price: { control: 'text', name: 'Pris' },
    description: { control: 'text', name: 'Beskrivning' },
  },
}

export const Standard = {}
export const LangRubrik = {
  name: 'Lång rubrik i smal vy',
  args: { title: 'Fotografera stadens människor och mötesplatser i vinterns sista kvällsljus' },
  decorators: [(Story) => <div style={{ width: '20rem' }}><Story /></div>],
}

import { createContext, useEffect, useState } from "react";


interface PcComponent {
  name: string;
  price: number;
  amountInStock: number;
  amount?: number;
}

interface CPU extends PcComponent{
  maxRamFrequencyInMhz: number;
  maxRamSizeInGB: number;
  cpuSocket: string;
}

interface Motherboard extends CPU{
  ramSocket: string;
}

interface WaterCooler extends PcComponent{
  socketCompatibility: string[];
}
interface RamMemory extends PcComponent{
  ramSocket: string;
  frequencyInMhz: number;
  ramSizeInGb: number;
}

interface GraphicCard extends PcComponent{
  graphicCardSizeInCm: number;
}

interface PcCabinet extends PcComponent{
  cabinetSizeInCm: number;
}

type CurrentComponent = 'Processador' | 'Placa mãe' | 'Water Cooler' | 'Memória RAM' 
| 'Placa de vídeo' | 'Hard Disk' | 'SSD' | 'Fonte' | 'Gabinete' | 'Monitor';


interface UserSetup{
  cpu: CPU;
  motherboard: Motherboard;
  waterCooler: WaterCooler;
  ramMemory: RamMemory;
  graphicCard: GraphicCard;
  hardDisk: PcComponent;
  SSD: PcComponent;
  powerSupply: PcComponent;
  pcCabinet: PcCabinet;
  screen: PcComponent;
}

interface ComputerContextProps{
  currentComponent: CurrentComponent;
  setup: UserSetup;
  setupPrice: number;
  changeCurrentComponent: (componentName: CurrentComponent) => void;
  skipComponent: (componentName: CurrentComponent) => void;
  insertComponentIntoSetup: (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
    ) => void;
  changeComponentIntoSetup: (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
    ) => void;
  removeComponentIntoSetup: (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
    ) => void;
}

export const ComputerContext = createContext({} as ComputerContextProps)

export function ComputerContextProvider ({ children } ) {
  const [currentComponent, setCurrentComponent] = useState<CurrentComponent>('Processador')
  const [setup, setSetup] = useState<UserSetup>({} as UserSetup)
  const [setupPrice, setSetupPrice] = useState(0)

  useEffect(() => {
    const savedSetup = JSON.parse(localStorage.getItem('konecta@setup'))
    if(!savedSetup) return
    let currentSetupPrice: number = 0

    for (const key in savedSetup) {
      if (Object.prototype.hasOwnProperty.call(savedSetup, key)) {
        currentSetupPrice += savedSetup[key].price;
      }
    }
    console.log('checked')
    setSetupPrice(currentSetupPrice)
    setSetup(savedSetup);
  }, [])

  function changeCurrentComponent (componentName: CurrentComponent) {
    setCurrentComponent(componentName)
  }

  // function handleChangeSetup(componentName){
  //   switch(componentName){
  //     case 'Processador':
  //       setCurrentComponent('Placa mãe');
  //       break;
  //     case 'Placa mãe':
  //       setCurrentComponent('Water Cooler');
  //       break;
  //     case 'Water Cooler':
  //       setCurrentComponent('Memória RAM');
  //       break;
  //     case 'Memória RAM':
  //       setCurrentComponent('Placa de vídeo');
  //       break;
  //     case 'Placa de vídeo':
  //       setCurrentComponent('Hard Disk');
  //       break;
  //     case 'Hard Disk':
  //       setCurrentComponent('SSD');
  //       break;
  //     case 'SSD':
  //       setCurrentComponent('Fonte');
  //       break;
  //     case 'Fonte':
  //       setCurrentComponent('Gabinete');
  //       break;
  //     case 'Gabinete':
  //       setCurrentComponent('Monitor');
  //       break;
  //   }
  // }

  function insertComponentIntoSetup (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
  ) {
    const newSetup = {...setup};
    newSetup[componentName] = product
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }

    // handleChangeSetup(componentName)
    localStorage.setItem('konecta@setup', JSON.stringify(newSetup))
    setSetupPrice(currentSetupPrice)
    setSetup(newSetup)
  }
  
  function changeComponentIntoSetup (
    componentName: CurrentComponent, 
    product: PcComponent | PcCabinet | GraphicCard | RamMemory | Motherboard | CPU
  ) {
    const newSetup = {...setup};
    newSetup[componentName] = product;
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }
    setSetupPrice(currentSetupPrice)

    setSetup(newSetup);
  }

  function removeComponentIntoSetup (
    componentName: CurrentComponent
  ) {
    const newSetup = {...setup};
    newSetup[componentName] = {};
    let currentSetupPrice: number = 0

    for (const key in newSetup) {
      if (Object.prototype.hasOwnProperty.call(newSetup, key)) {
        currentSetupPrice += newSetup[key].price;
      }
    }

    setSetup(newSetup);
  }

  function skipComponent(componentName: string){
    const newSetup = {...setup};
    newSetup[componentName] = {name: "skipped", price: 0}
    
    localStorage.setItem('konecta@setup', JSON.stringify(newSetup))
    setSetup(newSetup)
  }

  return ( 
    <ComputerContext.Provider value={{
      currentComponent,
      setup,
      setupPrice,
      insertComponentIntoSetup,
      changeComponentIntoSetup,
      removeComponentIntoSetup,
      changeCurrentComponent,
      skipComponent
    } as ComputerContextProps}>
      {children}
    </ComputerContext.Provider>
  )
  
}
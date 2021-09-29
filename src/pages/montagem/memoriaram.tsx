import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { fetchStock } from '../../services/fetchStock';

export default function MemoriaRam() {
  const [ramMemoryList, setRamMemoryList] = useState([]);

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    if(!estoqueEmCache){
      fetchStock('ramMemories', setRamMemoryList).then(() => console.log('Carregado!'))
    } else {
      setRamMemoryList(estoqueEmCache.ramMemories)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Memória RAM | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Memória RAM</h2>
            <p>Escolha uma memória RAM para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {ramMemoryList && ramMemoryList[0] ? (
            <ComponentsTable
              maxItems={4}
              products={ramMemoryList}
              componentName={'ramMemory'}
              moreThanOne={true}
              onChoose={{ redirectTo: '/montagem/placadevideo' }}
            />
          ) : (
            <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
          )}
        </section>

        {/* <SkipComponentButton nextComponent='placadevideo'/> */}
      </main>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { data } = await api.get('', {
//     params: {
//       pesquisa: 'memoria',
//       situacao: 'A'
//     },
//   })

//   const ramMemory = data.retorno.produtos.map(el => {
//     const produto = el.produto;

//     const sockets = getRAMSocketCompatibility(produto.nome)
//     if (produto.nome.includes('NOTEBOOK')) return null
//     if (produto.nome.includes("CARTÃO")) return null

//     const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)
    
//     if(!hasInStock) return null



//     return {
//       name: produto.nome,
//       price: produto.preco,
//       ramSocket: sockets[0] || null,
//       ramSizeInGb: getSizeInGb(produto.nome),
//       frequencyInMhz: getRamFrequencyInMhz(produto.nome),
//     }
//   })

//   return {
//     props: {
//       ramMemory: ramMemory.filter(el => el !== null),
//     },
//     revalidate: 1000 * 60 * 10 // 10 minutos 
//   }
// }

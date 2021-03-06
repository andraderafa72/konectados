import { useEffect, useState } from 'react';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
import { ComponentsTable } from '../../components/ComponentsTable';
import Head from 'next/head';
import { fetchStock } from '../../services/fetchStock';
import { ProductModal } from '../../components/ProductModal';

export default function Fans() {
  const [coolerList, setCoolerList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [productModal, setProductModal] = useState(null);

  function handleOpenModal(product) {
    setProductModal(product)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const estoqueEmCache = JSON.parse(localStorage.getItem('Konectados@stockCache'))

    const promise = async () => {
      setIsLoading(true)
      await fetchStock("fans", setCoolerList);
    }

    if (!estoqueEmCache) {
      promise().then(() => setIsLoading(false))
    } else {
      setCoolerList(estoqueEmCache.fans)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Coolers | Konectados</title>
      </Head>

      {productModal && (
        <ProductModal
          isOpen={modalIsOpen}
          product={productModal}
          changeStateFunction={() =>  setIsModalOpen(false)}
        />
      )}

      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>FANs</h2>
            <p>Escolha um ou mais FANs ou pule esta etapa.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {!isLoading && coolerList[0] ? (
            <ComponentsTable
              products={coolerList}
              handleOpenModal={handleOpenModal}
              componentName={'fan'}
              onChoose={{ redirectTo: '/montagem/monitor' }}
              moreThanOne
            />
          ) : (
            <div className="loading"></div>
          )}
        </section>

        {/* <SkipComponentButton componentToSkip='waterCooler' nextComponent='memoriaram' /> */}
      </main>
    </>
  )
}


// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { data } = await api.get('', {
//     params: {
//       pesquisa: 'Fan',
//       situacao: 'A'
//     },
//   })

//   const fans = data.retorno.produtos.map(el => {
//     const produto = el.produto;

//     const sockets = getSocketCompatibility(produto.nome)

//     if (produto.nome.includes('SUPORTE')) return null
//     if (produto.nome.includes('CABO')) return null
//     if (produto.nome.includes('GABINETE GAMER')) return null
//     if (produto.nome.includes('GABINETE 1 BAIA')) return null
//     if (produto.nome.includes('MOUSE')) return null
//     if (produto.nome.includes('CONTROLADORA')) return null

//     const hasInStock = checkHasProductInStock(produto.nome, produto.codigo)

//     if(!hasInStock) return null

//     return {
//       name: produto.nome,
//       price: produto.preco,
//       socketCompatibility: sockets[0] ? sockets : ['Universal'],
//     }
//   })

//   return {
//     props: {
//       fans: fans.filter(el => el !== null),
//     },
//     revalidate: 1000 * 60 * 10 // 10 minutos 
//   }
// }

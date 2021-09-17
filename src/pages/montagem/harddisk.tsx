import React from 'react';
import { useComputer } from '../../hooks/useComputer';
import { Subtotal } from '../../components/Subtotal';
import styles from '../../styles/montagem.module.scss';
// import hd from '../../../hd.json';
import { ComponentsTable } from '../../components/ComponentsTable';
import { SkipComponentButton } from '../../components/SkipComponentButton';
import { GetStaticProps } from 'next';
import { api } from '../../services/api';
import { getSizeInGb } from '../../utils/getSizeInGb';
import Head from 'next/head';

export default function HardDisk({ hardDisk }) {
  return (
    <>
      <Head>
        <title>Hard Disk | Konectados</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.componentInfo}>
          <div className={styles.componentName}>
            <h2>Hard Disk</h2>
            <p>Escolha um processador para continuar.</p>
          </div>
          <Subtotal />
        </section>

        <section className={styles.productTableSection}>
          {hardDisk && hardDisk[0] ? (
            <ComponentsTable
              products={hardDisk}
              componentName={'hardDisk'}
              moreThanOne={true}
              onChoose={{ redirectTo: '/montagem/ssd' }}
            />
          ) : (
            <h3>Ops! Estamos realizando uma manutenção, logo a montagem estará disponível.</h3>
          )}
        </section>

        {/* <SkipComponentButton componentToSkip='hardDisk' nextComponent='ssd'/> */}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get('', {
    params: {
      pesquisa: 'HD ',
      situacao: 'A'
    },
  })

  const hardDisk = data.retorno.produtos.map(el => {
    const produto = el.produto;

    // if (!produto.nome.includes(' - ')) return null
    if (produto.nome.includes('PLACA')) return null
    const sizeInGb = getSizeInGb(produto.nome)
    if (sizeInGb === 0) return null
    return {
      name: produto.nome,
      price: produto.preco,
      sizeInGb
    }
  })

  return {
    props: {
      hardDisk: hardDisk.filter(el => el !== null),
    },
    revalidate: 1000 * 60 * 10 // 10 minutos 
  }
}

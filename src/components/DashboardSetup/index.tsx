import { SetupCard } from './SetupCard';
import styles from './styles.module.scss';

export function DashboardSetup({ userSetup }) {
  
  const { setup } = userSetup
  return (
    <section className={styles.container}>
      <header>
        <h2>Especificações</h2>

        <p>{userSetup.email || `WhatsApp: +${userSetup.phoneNumber}`} • <span>{new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(userSetup.price)}</span></p>
      </header>

      <SetupCard
        component={setup.cpu}
      />
      <SetupCard
        component={setup.motherboard}
      />

      {setup.waterCooler.description !== 'skipped' && (
        <SetupCard
          component={setup.waterCooler}
        />
      )}

      {setup.ramMemory.ListOfComponents.map((el, index) => (
        <SetupCard
          component={el}
          key={index}
        />
      ))}

      {setup.graphicCard.description !== 'skipped' && (
        <SetupCard
          component={setup.graphicCard}
        />
      )}

      {setup.hardDisk?.ListOfComponents?.map((el, index) => (
        <>
          {el.name !== 'skipped' && (
            <SetupCard
              component={el}
              key={index}
            />
          )}
        </>
      ))}

      {setup.SSD?.ListOfComponents?.map((el, index) => (
        <>
          {el.name !== 'skipped' && (
            <SetupCard
              component={el}
              key={index}
            />
          )}
        </>
      ))}

      <SetupCard
        component={setup.powerSupply}
      />
      <SetupCard
        component={setup.pcCabinet}
      />

      {setup.fan?.description !== 'skipped' &&
        setup.fan?.ListOfComponents.map((el, index) => {
          return (
            <SetupCard
              component={setup.fan}
              key={index}
            />
          )
        }
        )}
      {setup.monitor?.description !== 'skipped' && (
        <SetupCard
          component={setup.monitor}
        />
      )}

    </section>
  );
}
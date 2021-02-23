import React from 'react'
import Postgres from '../driver/Postgres'
import SQLite from '../driver/SQLite'
import RedShift from '../driver/Redshift'
import BigQuery from '../driver/BigQuery'
import MySQL from '../driver/MySQL'
import Druid from '../driver/Druid'
import GoogleAnalytics from '../driver/GoogleAnalytics'
import H2 from '../driver/H2'
import MongoDB from '../driver/MongoDB'
import Presto from '../driver/Presto'
import Snowflake from '../driver/Snowflake'
import SparkSQL from '../driver/SparkSQL'
import SqlServer from '../driver/SqlServer'

function DatabaseDriver(props) {
    const {submit,
            inputting,
            engine,
            sslSwitch,
            sshTunnel,
            autoRunQueries,
            userControlScheduling,
            name,
            host,
            port,
            username,
            password,
            tunnelPort,
            tunnelHost,
            tunnelUser,
            tunnelPrivateKey,
            tunnelPassword,
            sshAuth,
            jdbc,
            switches,
            jvmTimezone,
            datasetId,
            GaAccountID,
            GaClientID,
            GaSecret,
            authCode,
            d,
            b,
            c,
            dnsSRV,
            account,
            region,
            dbname,
            schema,
            role,
            warehouse,
            db,
            dbInstanceName,
            json,
            authDatabase,
            sslCert} = props


    switch (engine) {
        case "postgres":
            return <Postgres
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        tunnelPort={tunnelPort}
                        tunnelHost={tunnelHost}
                        tunnelUser={tunnelUser}
                        tunnelPrivateKey={tunnelPrivateKey}
                        tunnelPassword={tunnelPassword}
                        sshAuth={sshAuth}
                        jdbc={jdbc}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />;
        case "sqlite":
            return <SQLite
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        switches={switches}
                        db={db}
                        d={d}
                        b={b}
                        c={c}
            />
        case "redshift":
            return <RedShift
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        switches={switches}
                        tunnelPort={tunnelPort}
                        tunnelHost={tunnelHost}
                        tunnelUser={tunnelUser}
                        tunnelPrivateKey={tunnelPrivateKey}
                        tunnelPassword={tunnelPassword}
                        sshAuth={sshAuth}
                        d={d}
                        b={b}
                        c={c}
            />
        case "bigquery":
            return <BigQuery
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        jvmTimezone={jvmTimezone}
                        datasetId={datasetId}
                        switches={switches}
                        json={json}
                        d={d}
                        b={b}
                        c={c}
                    />
        case "mysql":
            return <MySQL
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        tunnelPort={tunnelPort}
                        tunnelHost={tunnelHost}
                        tunnelUser={tunnelUser}
                        tunnelPrivateKey={tunnelPrivateKey}
                        tunnelPassword={tunnelPassword}
                        sshAuth={sshAuth}
                        d={d}
                        b={b}
                        c={c}
                    />;
        case "druid":
            return <Druid
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        switches={switches}
                        tunnelPort={tunnelPort}
                        tunnelHost={tunnelHost}
                        tunnelUser={tunnelUser}
                        tunnelPrivateKey={tunnelPrivateKey}
                        tunnelPassword={tunnelPassword}
                        sshAuth={sshAuth}
                        d={d}
                        b={b}
                        c={c}
                    />;
        case "googleanalytics":
            return <GoogleAnalytics
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        GaAccountID={GaAccountID}
                        GaClientID={GaClientID}
                        GaSecret={GaSecret}
                        authCode={authCode}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />;
        case "h2":
            return <H2
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        db={db}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />;
        case "mongo":
            return <MongoDB
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        authDatabase={authDatabase}
                        sslSwitch={sslSwitch}
                        sslCert={sslCert}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        db={db}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        dnsSRV={dnsSRV}
                        tunnelPort={tunnelPort}
                        tunnelHost={tunnelHost}
                        tunnelUser={tunnelUser}
                        tunnelPrivateKey={tunnelPrivateKey}
                        tunnelPassword={tunnelPassword}
                        sshAuth={sshAuth}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
            />;
        case "presto":
            return <Presto
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        tunnelPort={tunnelPort}
                        tunnelHost={tunnelHost}
                        tunnelUser={tunnelUser}
                        tunnelPrivateKey={tunnelPrivateKey}
                        tunnelPassword={tunnelPassword}
                        sshAuth={sshAuth}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />
        case "snowflake":
            return <Snowflake
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        username={username}
                        password={password}
                        account={account}
                        region={region}
                        dbname={dbname}
                        schema={schema}
                        role={role}
                        warehouse={warehouse}
                        jdbc={jdbc}
                        tunnelPort={tunnelPort}
                        tunnelHost={tunnelHost}
                        tunnelUser={tunnelUser}
                        tunnelPrivateKey={tunnelPrivateKey}
                        tunnelPassword={tunnelPassword}
                        sshAuth={sshAuth}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />
        case "sparksql":
            return <SparkSQL
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
            />
        case "sqlserver":
            return <SqlServer
                        submit={submit}
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        dbInstanceName={dbInstanceName}
                        tunnelPort={tunnelPort}
                        tunnelHost={tunnelHost}
                        tunnelUser={tunnelUser}
                        tunnelPrivateKey={tunnelPrivateKey}
                        tunnelPassword={tunnelPassword}
                        sshAuth={sshAuth}
                        d={d}
                        b={b}
                        c={c}
                    />
        default:
            break;
    }
}

export default DatabaseDriver

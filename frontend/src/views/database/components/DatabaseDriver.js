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
    const { status,
            errorInput,
            jsonProcess,
            inputting,
            parseTunneling,
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
            parseScheduling,
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
            sslCert,
            filterChange,
            filterTime,
            filterDate,
            filterTimeChanges,
            filterDayChanges,
            filterChanges,
            changes,
            day,
            onChanges,
            onDayChange,
            onTimeChange,
            changingOnThe,
            changeOnTheChange,
            onThe,
            onTheChange,
            oriChange,
            changeOriChange,
            time,
            page,
            setPage,} = props


    switch (engine) {
        case "postgres":
            return <Postgres
                        parseTunneling={parseTunneling}
                        parseScheduling={parseScheduling}
                        page={page}
                        setPage={setPage}
                        status={status}
                        errorInput={errorInput}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
                    />;
        case "sqlite":
            return <SQLite
                        parseTunneling={parseTunneling}
                        parseScheduling={parseScheduling}
                        page={page}
                        setPage={setPage}
                        errorInput={errorInput}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
            />
        case "redshift":
            return <RedShift
                        parseTunneling={parseTunneling}
                        parseScheduling={parseScheduling}
                        page={page}
                        setPage={setPage}
                        errorInput={errorInput}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
            />
        case "bigquery":
            return <BigQuery
                        jsonProcess={jsonProcess}
                        parseScheduling={parseScheduling}
                        errorInput={errorInput}
                        page={page}
                        setPage={setPage}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
                    />
        case "mysql":
            return <MySQL
                        parseTunneling={parseTunneling}
                        parseScheduling={parseScheduling}
                        page={page}
                        setPage={setPage}
                        status={status}
                        errorInput={errorInput}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
                    />;
        case "druid":
            return <Druid
                        parseTunneling={parseTunneling}
                        parseScheduling={parseScheduling}
                        errorInput={errorInput}
                        page={page}
                        setPage={setPage}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
                    />;
        case "googleanalytics":
            return <GoogleAnalytics
                        parseScheduling={parseScheduling}
                        errorInput={errorInput}
                        page={page}
                        setPage={setPage}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
                    />;
        case "h2":
            return <H2
                        parseScheduling={parseScheduling}
                        errorInput={errorInput}
                        page={page}
                        setPage={setPage}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
                    />;
        case "mongo":
            return <MongoDB
                        parseTunneling={parseTunneling}
                        parseScheduling={parseScheduling}
                        errorInput={errorInput}
                        page={page}
                        setPage={setPage}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
            />;
        case "presto":
            return <Presto
                        parseTunneling={parseTunneling}
                        parseScheduling={parseScheduling}
                        errorInput={errorInput}
                        page={page}
                        setPage={setPage}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
                    />
        case "snowflake":
            return <Snowflake
                        parseTunneling={parseTunneling}
                        parseScheduling={parseScheduling}
                        errorInput={errorInput}
                        page={page}
                        setPage={setPage}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
                    />
        case "sparksql":
            return <SparkSQL
                        parseTunneling={parseTunneling}
                        parseScheduling={parseScheduling}
                        errorInput={errorInput}
                        page={page}
                        setPage={setPage}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
            />
        case "sqlserver":
            return <SqlServer
                        parseTunneling={parseTunneling}
                        parseScheduling={parseScheduling}
                        errorInput={errorInput}
                        page={page}
                        setPage={setPage}
                        status={status}
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
                        filterChange={filterChange}
                        filterTime={filterTime}
                        filterDate={filterDate}
                        filterTimeChanges={filterTimeChanges}
                        filterDayChanges={filterDayChanges}
                        filterChanges={filterChanges}
                        changes={changes}
                        time={time}
                        day={day}
                        onChanges={onChanges}
                        onDayChange={onDayChange}
                        onTimeChange={onTimeChange}
                        changingOnThe={changingOnThe}
                        changeOnTheChange={changeOnTheChange}
                        onThe={onThe}
                        onTheChange={onTheChange}
                        oriChange={oriChange}
                        changeOriChange={changeOriChange}
                    />
        default:
            break;
    }
}

export default DatabaseDriver

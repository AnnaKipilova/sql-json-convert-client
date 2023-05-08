import style from './ConnectForm.module.css';
import Axios from 'axios';
import Input from '../UI/input/Input';
import React, { useState, FC, useContext } from 'react';
// import LanguageContext from '../../LanguageContext';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../../services/helper';

const ConnectForm = (
    {
        onSuccess,
        handleAllTableNamesList
    }) => {

    // const { lng, setLng } = useContext(LanguageContext);
    // const handleLanguageChange = (language) => {
    //     setLng(language);
    // }
    const { t, i18n } = useTranslation();

    const [host, setHost] = useState("dbs.kpi.fei.tuke.sk");
    const [user, setUser] = useState("kipilova");
    const [password, setPassword] = useState("kipilova");
    const [database, setDatabase] = useState("kipilova");
    const [connectError, setConnectError] = useState("");

    // pripojenie na databazu
    const connectToDatabase = (event) => {
        event.preventDefault(); // aby sa neotvorila nova stranka pri submitnuti

        // Axios.post('https://cors-anywhere.herokuapp.com/https://sqljsonconverter.herokuapp.com/connect', {
        Axios.post('https://sql-to-json-converter-backend.onrender.com/connect', {
        host: host,
        user: user,
        password: password,
        database: database,
        }).then(response => {
            handleAllTableNamesList(response.data);
            setConnectError("");
            onSuccess();
        }).catch((error) => {
            console.error('Failed to connect to database:', error.message);
            setConnectError("Can't connect to database!");
        });
    };

    return (
        <div className={style.databaseForm}>
            <form onSubmit={connectToDatabase}>
                <Input label={t('host')} type="text" onChange={host => setHost(host)} value={host} />
                <Input label={t('user')} type="text" onChange={user => setUser(user)} value={user} />
                <Input label={t('password')} type="password" onChange={password => setPassword(password)} value={password} />
                <Input label={t('database')} type="text" onChange={database => setDatabase(database)} value={database} />
                {connectError && (
                    <div className={style.connectError}>
                        {connectError}
                    </div>
                )}
                <button className={style.buttonSubmit} type='submit'>{t('connectModal')}</button>
            </form>
        </div>
        
    );
};

export default ConnectForm;
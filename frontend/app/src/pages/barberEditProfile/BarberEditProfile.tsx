import { useState, useEffect } from 'react'
import './BarberEditProfile.css'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface patchInterface {
    name?: string,
    email?: string,
    password?: string,
    number?: string,
}

const BarberEditProfile = () => {
    const { user, loading } = useAuth();

    const [name, setName] = useState<string | undefined> (user?.name);
    const [email, setEmail] = useState<string | undefined> (user?.email);
    const [number, setNumber] = useState<string | undefined> (user?.number);

    const [newName, setNewName] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [newNumber, setNewNumber] = useState<string>('');
    const [changeNamePopout, setChangeNamePopout] = useState<boolean>(false);
    const [changeEmailPopout, setChangeEmailPopout] = useState<boolean>(false);
    const [changeNumberPopout, setChangeNumberPopout] = useState<boolean>(false);

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [checkNewPassword, setCheckNewPassword] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const patchData: patchInterface = {};

        if (newName) {
            patchData.name = newName
            setName(newName);
        }
        if (newEmail) {
            if (!newEmail.includes("@")) {
                alert("Insira um email válido!");
                return;
            }
            patchData.email = newEmail;
            setEmail(newEmail);
        }
        if (newNumber) {
            patchData.number = newNumber
            setNumber(newNumber);
        }

        try {
            await axios.patch(`http://localhost:3000/barbers/${user?.id}`, patchData);
            alert("Alterações salvas com sucesso!");
        } catch {
            alert("Erro ao salvar alterações!");
        }
    };

    const handlePasswordChange = async () => {
        try {
            const res = await axios.post("http://localhost:3000/barbers/login", {
                email: user?.email,
                password: oldPassword
            });

            if (res.status !== 200) {
                alert("Senha incorreta");
                return;
            }

            if (newPassword !== checkNewPassword) {
                alert("As senhas não são iguais");
                return;
            }

            if (newPassword.length < 6) {
                alert("A nova senha deve conter pelo menos 6 caracteres");
                return;
            }

            await axios.patch(`http://localhost:3000/barbers/${user?.id}`, { password: newPassword });
            alert("Senha alterada com sucesso!");

            setOldPassword('');
            setNewPassword('');
            setCheckNewPassword('');
        } catch {
            alert("Erro ao alterar senha!");
        }
    };

    useEffect(() => {
        if (!loading && (!user || user.role !== 'barber')) {
            navigate('/');
        }
    }, [user, loading]);

    return (
        <div className='edit-profile-container'>
            <header>
                <button onClick={() => { navigate('/controlPanel') }}>Voltar</button>
            </header>

            <div className='account-details'>
                <h1>Informações de conta</h1>

                <div className='info-row'>
                    <div className='info-header'>
                        <h3>Nome de usuário</h3>
                        <h4>{name}</h4>
                    </div>
                    {changeNamePopout ? (
                        <div className='edit-field'>
                            <input
                                onChange={(e) => setNewName(e.target.value)}
                                value={newName}
                                placeholder="Novo nome"
                            />
                            <div className='buttons'>
                                <button onClick={() => { handleSubmit(); setChangeNamePopout(false); setNewName('') }}>Salvar</button>
                                <button onClick={() => { setChangeNamePopout(false); setNewName('') }}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setChangeNamePopout(true)}>Editar</button>
                    )}
                </div>

                <div className='info-row'>
                    <div className='info-header'>
                        <h3>Email</h3>
                        <h4>{user?.email}</h4>
                    </div>
                    {changeEmailPopout ? (
                        <div className='edit-field'>
                            <input
                                onChange={(e) => setNewEmail(e.target.value)}
                                value={newEmail}
                                placeholder="Novo email"
                            />
                            <div className='buttons'>
                                <button onClick={() => { handleSubmit(); setChangeEmailPopout(false); setNewEmail('') }}>Salvar</button>
                                <button onClick={() => { setChangeEmailPopout(false); setNewEmail('') }}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setChangeEmailPopout(true)}>Editar</button>
                    )}
                </div>

                <div className='info-row'>
                    <div className='info-header'>
                        <h3>Número</h3>
                        <h4>{user?.number}</h4>
                    </div>
                    {changeNumberPopout ? (
                        <div className='edit-field'>
                            <input
                                onChange={(e) => setNewNumber(e.target.value)}
                                value={newNumber}
                                placeholder="Novo número"
                            />
                            <div className='buttons'>
                                <button onClick={() => { handleSubmit(); setChangeNumberPopout(false); setNewNumber('') }}>Salvar</button>
                                <button onClick={() => { setChangeNumberPopout(false); setNewNumber('') }}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setChangeNumberPopout(true)}>Editar</button>
                    )}
                </div>
            </div>

            <div className='change-password-content'>
                <h1>Alterar senha</h1>

                <form>
                    <label>
                        Confirme sua senha atual:
                        <input
                            onChange={(e) => setOldPassword(e.target.value)}
                            value={oldPassword}
                            type='password'
                        />
                    </label>

                    <label>
                        Nova senha:
                        <input
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            type='password'
                        />
                    </label>

                    <label>
                        Confirmar nova senha:
                        <input
                            onChange={(e) => setCheckNewPassword(e.target.value)}
                            value={checkNewPassword}
                            type='password'
                        />
                    </label>
                </form>

                <button onClick={handlePasswordChange}>Salvar alterações</button>
            </div>
        </div>
    )
}

export default BarberEditProfile

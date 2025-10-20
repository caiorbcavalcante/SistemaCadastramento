import  { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../../contexts/AuthContext';
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import './manageServices.css'


interface services {
    id_service: number,
    price: number,
    description: string
}

const ManageServices = () => {
    const {user} = useAuth();
    const [servicesList, setServicesList] = useState<services[]>([]);
    const [editServicePopout, setEditServicePopout] = useState<boolean> (false);
    const [selectedService, setSelectedService] = useState<services | null> (null);
    const [newServiceDesc, setNewServiceDesc] = useState<string | undefined> ();
    const [newServicePrice, setNewServicePrice] = useState<number | undefined> ();
    const [deleteServicePopout, setDeleteServicePopout] = useState<boolean> (false);
    const [showAddServicePopout, setShowAddServicePopout] = useState<boolean> (false);

     useEffect(() => {
            const fetchServicesList = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/service')
                    setServicesList(response.data.services)
                } catch (error) {
                    if(axios.isAxiosError(error)){
                        if(error.response){
                            alert(error.response.data.message);
                        } else if (error.request){
                            alert("Não foi possível se conectar com o servidor");
                        } else {
                            alert("Ocorreu um erro inesperado")
                        }}}
            }
    
            fetchServicesList();
        }, [user])

        const handleEditService = async () => {

            if (!selectedService) return;

            try {
                await axios.patch(`http://localhost:3000/service/${selectedService?.id_service}`, {
                    price: newServicePrice,
                    description: newServiceDesc
                })

                alert("Serviço atualizado com sucesso!");

                setServicesList(prev =>
                prev.map(service =>
                    service.id_service === selectedService?.id_service
                    ? {
                        ...service,
                        price: newServicePrice ?? service.price,
                        description: newServiceDesc ?? service.description}
                    : service));

                setEditServicePopout(false);
                setSelectedService(null);
                setNewServiceDesc(undefined);
                setNewServicePrice(undefined);

            } catch (error) {
                if (axios.isAxiosError(error)){
                    if (error.response) {
                        alert(error.response.data.message)
                    } else if (error.request){
                        alert("Não foi possível se conectar com o servidor");

                    } else {
                        alert("Ocorreu um erro inesperado")
                    }
                }  
            }
        }

      const handleDeleteService = async () => {
        try {
            await axios.delete(`http://localhost:3000/service/${selectedService?.id_service}`)
            alert("Serviço deletado com sucesso!");


            setServicesList(prev =>
                prev.filter(service => service.id_service !== selectedService?.id_service)
            
            );
            setDeleteServicePopout(false);
            setSelectedService(null);

        } catch (error) {

            if(axios.isAxiosError(error)){
                if (error.response) {
                    alert(error.response.data.message)
                } else if (error.request) {
                    alert("Não foi possível se conectar com o servidor. ");
                } else {
                    alert("Ocorreu um erro inesperado.")
                }
            }
        }
            
        }

        const handleAddService = async () => {
            try {
                const res = await axios.post("http://localhost:3000/service", 
                {
                    description: newServiceDesc,
                    price: newServicePrice})

                    setNewServiceDesc(undefined);
                    setNewServicePrice(undefined);
                    setShowAddServicePopout(false);

                    alert ("Serviço adicionado com sucesso!");

                    setServicesList(prevList => [...prevList, res.data.service])} 
            catch (error) {
                if (axios.isAxiosError(error)){
                    if (error.response) {alert(error.response.data.message)}
                    else if (error.request) {alert("Erro ao se conectar com o servidor")}
                    else {alert("Ocorreu um erro inesperado.")}
                }
            }   
        }
  return (
    <div>
        <div className='manage-services-content'>
            <h2>
                Gerenciar serviços
            </h2>

            {editServicePopout && selectedService && (
                <>
                <div className='edit-service-popout'>
                    <h2>
                        {selectedService.description}
                    </h2>
                        <label>
                            Alterar nome: 
                            <input value={newServiceDesc} onChange={(e) => setNewServiceDesc(e.target.value)}/>

                            Alterar preço: 
                            <input value={newServicePrice} onChange={(e) => setNewServicePrice(Number(e.target.value))}/>

                        </label>

                        <button onClick={() => handleEditService()}>Salvar alteraçòes</button>
                        <button onClick={() => {
                            setNewServiceDesc(undefined);
                            setNewServicePrice(undefined);
                            setEditServicePopout(false);
                            setSelectedService(null);
                        }}>
                            Cancelar
                        </button>
                    </div>
                </>
            )}

            {deleteServicePopout && selectedService && (
                <>
                <div className='delete-service-popout'>
                        <h2>
                            Tem certeza que deseja remover {selectedService.description} ?
                        </h2>

                        <button onClick={() => {handleDeleteService()}}>Apagar</button>
                        <button onClick={() => {
                            setDeleteServicePopout(false);
                            setSelectedService(null);
                        }}>
                            Cancelar
                        
                        </button>
                    </div>
                </>
            ) }

            {servicesList.length > 0 ? (
                <ul>
                    {servicesList.map(service => (
                        <li key={service.id_service}>
                            <h2>
                                {service.description} - R${service.price},00
                            </h2>
                            <div className='service-actions'>
                                <button onClick={() => {setEditServicePopout(true); setSelectedService(service)}} disabled={showAddServicePopout || editServicePopout || deleteServicePopout}>
                                    <FaEdit />
                                </button>

                                <button onClick={() => {setSelectedService(service); setDeleteServicePopout(true)}} disabled={showAddServicePopout || editServicePopout || deleteServicePopout}>
                                    <RiDeleteBinLine/>
                                </button>
                            </div>
                               
                        </li>
                    ))}
                </ul>
            ): (
                <h2>
                    Nenhum serviço cadastrado
                </h2>
            )}
        </div>

        <hr />

        <div className='add-new-service-content'>
            <h2>
                <button onClick={() => setShowAddServicePopout(true)} hidden={showAddServicePopout} disabled={showAddServicePopout || editServicePopout || deleteServicePopout}>
                    Adicionar novo serviço
                </button>
            </h2>

            {showAddServicePopout && (
                <> 
                    <label>
                        Descrição de serviço: 
                        <input value={newServiceDesc} onChange={(e) => setNewServiceDesc(e.target.value)}/>

                        Preço de serviço: 
                        <input value={newServicePrice} onChange={(e) => setNewServicePrice(Number(e.target.value))}/>
                    </label>

                    <button onClick={() => {handleAddService()}}>Adicionar serviço</button>
                    <button onClick={() => {
                        setNewServiceDesc(undefined);
                        setNewServicePrice(undefined);
                        setShowAddServicePopout(false);
                    }}>Cancelar</button>
                </>
            )}
        </div>
    </div>
  )
}

export default ManageServices
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import {cards} from "../components/cards"

function UserList(){

    const [User, setUser] = useState([]);

    // Constante de ação dos modals
    let [payment, setPayment] = useState("none"); // Constante para abrir pagamento
    let [payName, setPayName] = useState(""); // Constante para pegar nome usuário
    let [resul, setResul] = useState("none"); // Constante para abrir recebimento
    let [paymentError, setpaymentError] = useState(""); // Constante para mostrar o não do recebimento
    let [valueCards, setValueCards] = useState("1"); // Constante para valor do selection
    let [valueMoney, setValueMoney] = useState(""); // Constante para valor do dinheiro
    let [required, setRequired] = useState("none"); // Constante para validação de campo



  // Função GET que está trazendo os dados da API
  // useEffect, necessário para que o get execute apenas uma única vez
  const [Users, setUsers] = useState([])
  const [UserID, setUserID] = useState (0);
  useEffect(() => {
      axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {
          method: 'GET',
      }).then((resp) => {setUsers(resp.data)})
  }, [])

  UserID = Users.map(User.id)


  // Função para olhar modificação e recuperar valor no selection
  function handleChange(event){
      setValueCards(event.target.value);
  }


  // Abrir o modal do pagameto
  function modalPayOpen (name){
      setPayment("flex")
      setPayName(name)
  }

  // Função para dinheiro
  function inputChange(e){
      setValueMoney(e.target.value);
      setRequired("none");
  }

  // Abrir o modal de recibo de pagamento
  function modalResulOpen (){

    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
      axios.get(`${baseURL}/1`).then((response) => {
        setPost(response.data);
      });
    }, []);
  
    function createPost() {
      axios
        .post(baseURL, {
         // Card Info
          card_number: cards.card_number,
          cvv: cards.cvv,
          expiry_date: cards.expiry_date,
  
         // Destination User ID
          destination_user_id: UserID,
  
          // Value of the Transaction
          value: valueMoney,
  
        })
        .then((response) => {
          setPost(response.data);
        });
    }

      if (valueMoney === ""){
          setRequired("flex");
      }
      else{
          if (valueCards === "1"){
              setpaymentError("");
          } else{
              setpaymentError(<font color="red">não </font>);
              
          }
          setPayment("none");
          setResul("flex");
          setValueMoney("");
          setRequired("none");
          setUsers(Users)
          setUserID(id)
      }
      
  }
  
  // Fechamento do modal de recibo de pagamento
 function modalClose (){
      setResul("none");
        }


 // Retornando o conteúdo que será renderizado em tela
 // Função map percorrendo todo o array recuperado anteriormente com o axios e listando na tela cada linha do array
  return(
      <>
      {Users.map((t, index) =>{
          return (
          <div className="user-container" key={'user'+index}>
              <div className="user-wrapper">
                  <img className="user-thumbnail" src={t.img} alt=""/>
                  <div className="user-data">
                      <p>Nome do Usuário {t.name}</p>
                      <p>ID: {t.id} - Username: {t.username}</p>
                  </div>
                  <button onClick={()=>{modalPayOpen(t.name, t.id),createPost()}}>Pagar</button>
              </div>
          </div>
          )
      })}
       {/* ----------------Modal para o pagamento------------ */}
       <div className="modal" style={{display: payment}}>
              <span>Pagamento para <b>{payName}</b></span>
              <div className="input-money">
                  <NumberFormat thousandSeparator={true} value={valueMoney} onChange={inputChange} prefix={'R$ '} inputmode="numeric" placeholder="R$ 0,00"/>
                  <p style={{display:required}}>Campo obrigatório</p>
              </div>
              <select value={valueCards} onChange={handleChange}>
                  <option value="1">Cartão com final {cards[0].card_number.substr(-4)}</option>
                  <option value="2">Cartão com final {cards[1].card_number.substr(-4)}</option>
              </select>
              <button onClick={()=>{modalResulOpen ()}}>Pagar</button>
          </div>

          {/* -------------Modal de recibo de pagamento------------ */}
          <div className="modal" style={{display: resul}}>
                <span>Recibo de pagamento</span>
                <p>O Pagamento <strong>{paymentError}</strong>
                    <font color="green">foi</font> concluido com sucesso</p>
                <button onClick={()=>{modalClose()}}>Fechar</button>
          </div>
    </>
  )
}
export default UserList;

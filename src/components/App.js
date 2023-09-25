import Jogo from "./Jogo";
import Letras from "./Letras";
import forca0 from "../assets/forca0.png"
import forca1 from "../assets/forca1.png"
import forca2 from "../assets/forca2.png"
import forca3 from "../assets/forca3.png"
import forca4 from "../assets/forca4.png"
import forca5 from "../assets/forca5.png"
import forca6 from "../assets/forca6.png"
import palavras from "../Palavras";
import styled from "styled-components"
import React , {useState} from "react";

const imagens = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

export default function App() {
    const [palavraSelecionada, setPalavraSelecionada] = useState([])
    const [palavraQuebrada, setPalavraQuebrada] = useState([])
    const [palavraDoJogo, setPalavraDoJogo] = useState([])
    const [letrasUsadas, setLetrasUsadas] = useState(alfabeto)
    const [erros, setErros] = useState(0)
    const [color, setColor] = useState("black")
    const [chute, setChute] = useState()
    const [desabControl, setDesabControl] = useState(true)
    const [desabImput, setDesabImput] = useState(true)

    function iniciarJogo() {
        escolherPalavra()
        setLetrasUsadas([])
        setColor("black")
        setDesabImput(false)
        setErros(0)
        setDesabControl(false)
    }
    function escolherPalavra() {
        const p = Math.floor(Math.random() * palavras.length)
        const palavra = palavras[p]
        setPalavraSelecionada(palavra)

        const arrayPalavra = palavra.split("")
        setPalavraQuebrada(arrayPalavra)

        let underline = []
        arrayPalavra.forEach((letra) => underline.push(" _"))

        setPalavraDoJogo(underline)
    }
    function letraClicada(letraDoBotao) {
        setLetrasUsadas([...letrasUsadas, letraDoBotao])
        if (palavraSelecionada.includes(letraDoBotao)) {
            letraCerta(letraDoBotao)
        }
        else {
            letraErrada(letraDoBotao)
        }
    }
    function letraCerta(letraDoBotao) {
        const novaPalavraDoJogo = [...palavraDoJogo]
        palavraQuebrada.forEach((letra, q) => {
            if (palavraSelecionada[q] === letraDoBotao) {
                novaPalavraDoJogo[q] = letra
            }
        })
        setPalavraDoJogo(novaPalavraDoJogo)
        if (!novaPalavraDoJogo.includes(" _")) {
            setColor("green")
            finalizarJogo()
        }
    }
    function letraErrada(letraDoBotao) {
        const novoErro = erros + 1
        setErros(novoErro)
        if (erros + 1 === 6) {
            setColor("red")
            finalizarJogo()
        }
    }
    function chutar() {
        let stringPalavra = palavraQuebrada.join("")
        if (chute === stringPalavra) {
            setColor("green")
        }
        else {
            setErros(6)
            setColor("red")
        }
        finalizarJogo()
    }
    function finalizarJogo() {
        setLetrasUsadas(alfabeto)
        setDesabImput(true)
        setDesabControl(true)
        setChute("")
        setPalavraDoJogo(palavraQuebrada)
    }
    return (
        <Container>

            <Jogo
                imagens={imagens}
                erros={erros}
                iniciarJogo={iniciarJogo}
                palavraDoJogo={palavraDoJogo}
                palavraSelecionada={palavraSelecionada}
                color={color}

            />
            <Letras
                alfabeto={alfabeto}
                letrasUsadas={letrasUsadas}
                letraClicada={letraClicada}
            />

        </Container>
    )
}
const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: white;
`
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
const logo = require("./assets/logo.jpg");

export default function App() {
  const [pvp, setPvp] = useState("0");
  const [descuentoMio, setDescuentoMio] = useState("0");
  const [descuentoCliente, setDescuentoCliente] = useState("0");
  const [iva, setIva] = useState("21");
  const [resultados, setResultados] = useState({});

  const calcularPrecios = useCallback(() => {
    const pvpFloat = parseFloat(pvp) || 0;
    const descuentoMioFloat = (parseFloat(descuentoMio) || 0) / 100;
    const descuentoClienteFloat = (parseFloat(descuentoCliente) || 0) / 100;
    const ivaFloat = (parseFloat(iva) || 0) / 100;

    const netoMio = pvpFloat - pvpFloat * descuentoMioFloat;
    const netoCliente = pvpFloat - pvpFloat * descuentoClienteFloat;
    const gananciaSinIva = netoCliente - netoMio;
    const gananciaConIva = gananciaSinIva * (1 + ivaFloat);
    const pagarOreja = netoMio * (1 + ivaFloat);
    const cobrarCliente = netoCliente * (1 + ivaFloat);

    setResultados({
      netoMio: netoMio.toFixed(2),
      netoCliente: netoCliente.toFixed(2),
      gananciaSinIva: gananciaSinIva.toFixed(2),
      gananciaConIva: gananciaConIva.toFixed(2),
      pagarOreja: pagarOreja.toFixed(2),
      cobrarCliente: cobrarCliente.toFixed(2)
    });
  }, [pvp, descuentoMio, descuentoCliente, iva]);

  useEffect(() => {
    calcularPrecios();
  }, [calcularPrecios]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.title}>Oreja Calculadora</Text>

      <View style={styles.inputSection}>
        <View style={styles.inputGroup}>
          <Text>PVP:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setPvp}
            value={pvp}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Descuento Mío (%):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setDescuentoMio}
            value={descuentoMio}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Descuento Cliente (%):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setDescuentoCliente}
            value={descuentoCliente}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>IVA (%):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setIva}
            value={iva}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Calcular" onPress={calcularPrecios} />
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.resultsSection}>
        <Text>Neto Oreja: {resultados.netoMio} €</Text>
        <Text>Neto Cliente: {resultados.netoCliente} €</Text>
        <Text>Ganancia sin IVA: {resultados.gananciaSinIva} €</Text>
        <Text>Ganancia con IVA: {resultados.gananciaConIva} €</Text>
        <Text style={styles.highlightGreen}>
          Pagar Oreja: {resultados.pagarOreja} €
        </Text>
        <Text style={styles.highlightRed}>
          Cobrar Cliente: {resultados.cobrarCliente} €
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "red"
  },
  inputSection: {
    marginBottom: 20
  },
  inputGroup: {
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 20
  },
  resultsSection: {
    marginBottom: 20
  },
  highlightGreen: {
    fontWeight: "bold",
    backgroundColor: "darkgreen",
    color: "white",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10
  },
  highlightRed: {
    fontWeight: "bold",
    backgroundColor: "darkred",
    color: "white",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10
  },
  logo: {
    width: 500,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20
  }
});

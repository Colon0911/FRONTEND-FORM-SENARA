const Quixote = () => (
    <Document>
        <Page style={styles.body}>
            <Text style={styles.title}>Formulario Solicitud de Inscripción en el Plan de Riego</Text>
            <Text style={styles.text}>
                Yo, _______________________________, cédula N° _____________________, {'\n'}
                actuando en mi nombre o en representacion legal de la persona jurídica denominada
                ______________________, cédula jurídica ______________________ en calidad de usuario del predio
                inscrito en el Padrón de Usuarios con el número _______ ubicado en el sector Hidráulico ______________ del
                Subdistrito ______________ con una superficie total regable de ______________ hectáreas y en cumplimiento con el
                deber de usuario establecido en el Reglamento de Servicio de Riego vigente, en su árticulo 13, inciso 13.1 que
                textualmente dice: "Solicitar semestralmente la incorporación de sus planes de cultivos dentro del plan de riego del
                Distrito, antes de 15 de abril y 15 de octubre de cada año. El SENARA atenderá las solicitudes para cada semestre
                definido el plan de riego del Distrito, el cual se ajustará a la disponibilidad de agua, las condiciones del suelo y los
                requerimientos de los cultivos. Si el usuario no aporta los datos a su debido tiempo, el SENARA procederá a estimarlos
                discrecionalmente con base en la información que tenga disponible."
            </Text>
            <Text style={styles.text}>
                Presento aquí mi plan de cultivo, manifestando que tengo previsto sembrar los siguientes cultivos para el ______________
                ciclo del ______________ en las fechas que detallo, con el propósito que sean consideradas en la elaboración del Plan de
                Cultivos del DRAT y que se considere en el Plan de Cultivos y Programa de Riegos del DRAT, que el SENARA elabora en
                función de la disponibilidad de agua en la fuente.
            </Text>

            <Text style={styles.text}>
                Table Here!
            </Text>

            <View style={{ flexDirection: "row" }}>
                <View>
                    <Text style={styles.text}>
                        ____________________________________ {'\n'}
                        Firma y cédula del usuario o representante legal {'\n'}
                        Teléfono: _______________________ {'\n'}
                        Dirección: _________________________________ {'\n'}
                        Correo electrónico: ____________________________ {'\n'}
                    </Text>
                </View>
                <View styles={{ width: "100px" }}>
                    <Text style={styles.text}>
                        ______________________________ {'\n'}
                        Recibido en SENARA {'\n'}
                    </Text>
                </View>
            </View>
        </Page>
    </Document>
);

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 12,
        lineHeight: 1.4,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    }
});

ReactPDF.render(<Quixote />);
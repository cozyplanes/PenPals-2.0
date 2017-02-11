var synaptic = require('synaptic'); 
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;


function Perceptron(input, hidden, output)
{
    // create the layers 
    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);
 
    // connect the layers 
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);
 
    // set the layers 
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}
 

Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;


function LSTM(input, blocks, output)
{
    // create the layers
    var inputLayer = new Layer(input);
    var inputGate = new Layer(blocks);
    var forgetGate = new Layer(blocks);
    var memoryCell = new Layer(blocks);
    var outputGate = new Layer(blocks);
    var outputLayer = new Layer(output);

    // connections from input layer
    var input = inputLayer.project(memoryCell);
    inputLayer.project(inputGate);
    inputLayer.project(forgetGate);
    inputLayer.project(outputGate);

    // connections from memory cell
    var output = memoryCell.project(outputLayer);

    // self-connection
    var self = memoryCell.project(memoryCell);

    // peepholes
    memoryCell.project(inputGate);
    memoryCell.project(forgetGate);
    memoryCell.project(outputGate);

    // gates
    inputGate.gate(input, Layer.gateType.INPUT);
    forgetGate.gate(self, Layer.gateType.ONE_TO_ONE);
    outputGate.gate(output, Layer.gateType.OUTPUT);

    // input to output direct connection
    inputLayer.project(outputLayer);

    // set the layers of the neural network
    this.set({
        input: inputLayer,
        hidden: [inputGate, forgetGate, memoryCell, outputGate],
        output: outputLayer
    });
}

// extend the prototype chain
LSTM.prototype = new Network();
LSTM.prototype.constructor = LSTM;

var myPerceptron = new Perceptron(2,3,1);
var myTrainer = new Trainer(myPerceptron);

myTrainer.XOR(); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

var x = myPerceptron.activate([1,1]); // 0.0268581547421616
var y = myPerceptron.activate([1,0]); // 0.9829673642853368
var z = myPerceptron.activate([0,1]); // 0.9831714267395621
var f = myPerceptron.activate([1,1]); // 0.02128894618097928

console.log(x,y,z,f);


var hopfield = new Architect.Hopfield(10) // create a network for 10-bit patterns

// teach the network two different patterns
hopfield.learn([
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
])

// feed new patterns to the network and it will return the most similar to the ones it was trained to remember
hopfield.feed([0,1,0,1,0,1,0,1,1,1]) // [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
hopfield.feed([1,1,1,1,1,0,0,1,0,0]) // [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]


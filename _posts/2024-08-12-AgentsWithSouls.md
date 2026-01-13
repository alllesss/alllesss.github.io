---
layout: post
title: Agents with Souls
subtitle: Devlog n.2
comments: false
thumbnail-img: https://cdn.jsdelivr.net/gh/alllesss/eshraq.io-assets/images/05_Post/T_Agent_Walker_thumb.jpg
cover-img: https://cdn.jsdelivr.net/gh/alllesss/eshraq.io-assets/images/05_Post/T_Agent_UI_Cover.jpg  
readtime: true
nav-short: true
full-width: true
---

# Ontology
In the past month, among many updates to Eshraq, the most prominent was the introduction of Agents. In this short post, I’ll explain a bit about them.

In Eshraq, we have Souls and Agents. These two, when bound together, form a Player. An Agent is a machine or an organ with specific mechanics and senses. This machine can be taken over by a Soul.

{: .box-error}
Role of agents in Models -> **Exploration**, **Inspection**, **Interaction**
if [Under the light of the Soul]

Souls have no form or spatial representation. They can be referred to, but their essence cannot be grasped in any tangible form. If they could be grasped or concretized, they wouldn’t be Souls anymore.

Agents are hosts that can bind to the Souls and create an active Agent. In Eshraq, Souls can shift to many different Agents. They are hyper-mobile. Another way to describe Agents is as Pawns, which in Unreal Engine is actually the name of the parent class of Characters.

Every Agent has a specific form of navigation. There can be many instances of one Agent, as opposed to the Soul. There can only be one instance of a Soul in any model.

So far I have defined 5 agents in ESHRAQ. The identifier of Agents is their red orb. If you see a red orb in Eshraq, it’s most likely an Agent. However, not all Agents can be possessed by Souls. The Agents that can be possessed are called `Field Agents`, while those that are not possessable are akin to NPCs or mere machines. These agents are called `Free Agents` as they are free from being possessed by souls.

# Examples
The following is the list of agents currently made for ESHRAQ. All agents have physical forms and therefore spatially representable. meaning even the RTS Agent which provides bird's eye view now has a form. this helps to identify Agents in-play whitin the model. perhaps one can conceal this representation with some deceptive methods in the future but for now all agents are opaque and fully visible!

## Video Snippet
Below is a clip showing two of our agents in action.

<iframe width="100%" height="600" src="https://www.youtube.com/embed/noM6WE6dKmo?si=h2BAA3gWBd6Xahyh" title="YouTube video player" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 1. Agent Core
Every agent has a Core. a Core agent is just pure Core. It can bounce and roll on surfaces, making it a highly mobile agent. Its minimal size also allows for inspection of tight areas.
<figure align="center">
    <img src="https://cdn.jsdelivr.net/gh/alllesss/eshraq.io-assets/images/05_Post/T_Agent_Core_thumb.jpg" alt="">
    <figcaption><i><center></center></i></figcaption>
</figure>

## 2. Agent Walker
With two robotic legs, this agent can walk, climb up stairs, etc. the Legs proceduarally adjust their angle on each step to align with the ground's slope.
<figure align="center">
    <img src="https://cdn.jsdelivr.net/gh/alllesss/eshraq.io-assets/images/05_Post/T_Agent_Walker_thumb.jpg" alt="">
    <figcaption><i><center></center></i></figcaption>
</figure>

## 3. Agent Wheeler
An agent on Kart. drives everywhere and can actually go very fast. Using the headlight makes it a good option for exploring dark models.
<figure align="center">
    <img src="https://cdn.jsdelivr.net/gh/alllesss/eshraq.io-assets/images/05_Post/T_Agent_Wheeler_thumb.jpg" alt="">
    <figcaption><i><center></center></i></figcaption>
</figure>

## 4. Agent RTS
Provides bird's view, similar to real time strategy cameras.
<figure align="center">
    <img src="https://cdn.jsdelivr.net/gh/alllesss/eshraq.io-assets/images/05_Post/T_Agent_RTS.jpg" alt="">
    <figcaption><i><center></center></i></figcaption>
</figure>

## 5. Agent UI
This agent is more abstract, simply interacts with the User Interface of Eshraq.
<figure align="center">
    <img src="https://cdn.jsdelivr.net/gh/alllesss/eshraq.io-assets/images/05_Post/T_Agent_UI.jpg" alt="">
    <figcaption><i><center></center></i></figcaption>
</figure>


# Future Updates
In my next post—whenever that may be—I’ll explore the concept of Canvas and how it’s implemented in Eshraq. Canvas is the frame of a model or what holds the model, which proves to be an exciting addition to this framework.
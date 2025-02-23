# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Ec2Maestro <a name="Ec2Maestro" id="ec2-uptime-maestro-cdk.Ec2Maestro"></a>

#### Initializers <a name="Initializers" id="ec2-uptime-maestro-cdk.Ec2Maestro.Initializer"></a>

```typescript
import { Ec2Maestro } from 'ec2-uptime-maestro-cdk'

new Ec2Maestro(scope: Construct, id: string, props: IEc2MaestroProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ec2-uptime-maestro-cdk.Ec2Maestro.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#ec2-uptime-maestro-cdk.Ec2Maestro.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ec2-uptime-maestro-cdk.Ec2Maestro.Initializer.parameter.props">props</a></code> | <code><a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps">IEc2MaestroProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="ec2-uptime-maestro-cdk.Ec2Maestro.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="ec2-uptime-maestro-cdk.Ec2Maestro.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="ec2-uptime-maestro-cdk.Ec2Maestro.Initializer.parameter.props"></a>

- *Type:* <a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps">IEc2MaestroProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ec2-uptime-maestro-cdk.Ec2Maestro.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="ec2-uptime-maestro-cdk.Ec2Maestro.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ec2-uptime-maestro-cdk.Ec2Maestro.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="ec2-uptime-maestro-cdk.Ec2Maestro.isConstruct"></a>

```typescript
import { Ec2Maestro } from 'ec2-uptime-maestro-cdk'

Ec2Maestro.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="ec2-uptime-maestro-cdk.Ec2Maestro.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ec2-uptime-maestro-cdk.Ec2Maestro.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="ec2-uptime-maestro-cdk.Ec2Maestro.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IEc2MaestroProps <a name="IEc2MaestroProps" id="ec2-uptime-maestro-cdk.IEc2MaestroProps"></a>

- *Implemented By:* <a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps">IEc2MaestroProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps.property.checksum">checksum</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps.property.url">url</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps.property.version">version</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps.property.startRuleName">startRuleName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps.property.startSchedule">startSchedule</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps.property.stopRuleName">stopRuleName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps.property.stopSchedule">stopSchedule</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ec2-uptime-maestro-cdk.IEc2MaestroProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |

---

##### `checksum`<sup>Required</sup> <a name="checksum" id="ec2-uptime-maestro-cdk.IEc2MaestroProps.property.checksum"></a>

```typescript
public readonly checksum: string;
```

- *Type:* string

---

##### `url`<sup>Required</sup> <a name="url" id="ec2-uptime-maestro-cdk.IEc2MaestroProps.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---

##### `version`<sup>Required</sup> <a name="version" id="ec2-uptime-maestro-cdk.IEc2MaestroProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

---

##### `startRuleName`<sup>Optional</sup> <a name="startRuleName" id="ec2-uptime-maestro-cdk.IEc2MaestroProps.property.startRuleName"></a>

```typescript
public readonly startRuleName: string;
```

- *Type:* string

---

##### `startSchedule`<sup>Optional</sup> <a name="startSchedule" id="ec2-uptime-maestro-cdk.IEc2MaestroProps.property.startSchedule"></a>

```typescript
public readonly startSchedule: string;
```

- *Type:* string

---

##### `stopRuleName`<sup>Optional</sup> <a name="stopRuleName" id="ec2-uptime-maestro-cdk.IEc2MaestroProps.property.stopRuleName"></a>

```typescript
public readonly stopRuleName: string;
```

- *Type:* string

---

##### `stopSchedule`<sup>Optional</sup> <a name="stopSchedule" id="ec2-uptime-maestro-cdk.IEc2MaestroProps.property.stopSchedule"></a>

```typescript
public readonly stopSchedule: string;
```

- *Type:* string

---

##### `tags`<sup>Optional</sup> <a name="tags" id="ec2-uptime-maestro-cdk.IEc2MaestroProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---


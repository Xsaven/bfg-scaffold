export class ScaffoldConvertor {

    constructor(scaffold) {
        this.items = {};
        this.scaffold = JSON.parse(scaffold).scaffold;
        this.scaffold.map(this.touch.bind(this));
    }

    touch (model) {
        this.items[model.name] = {const: {title: model.title}};
        this.setAuth(model)
            .setType(model)
            .setTraits(model)
            .setHidden(model)
            .setAppends(model)
            .setWiths(model)
            .setGenerals(model)
            .setFields(model)
            .setRules(model)
            .setRelations(model)
            .setSeeds(model);
    }

    setAuth (model) {
        if (model.auth) {
            this.items[model.name].auth = true;
            if (model.must_verify) {
                this.items[model.name].must_verify = true;
            }
        }
        return this;
    }

    setType (model) {
        if (model.type !== 'hasOne') {
            this.items[model.name].type = model.type;
        }
        return this;
    }

    setGenerals (model) {
        if (!model.created) this.items[model.name].created = model.created;
        if (!model.updated) this.items[model.name].updated = model.updated;
        if (model.path !== 'app/Models') this.items[model.name].path = model.path;
        if (model.namespace !== 'App\\Models') this.items[model.name].namespace = model.namespace;
        if (model.foreign !== 'id') this.items[model.name].foreign = model.foreign;
        if (model.order.on && model.order.data) this.items[model.name].order = model.order.data;
        if (model.resource.on) this.items[model.name].resource = model.resource.data;
        if (model.observers.on) this.items[model.name].observer = model.observers.data;
        if (Object.keys(model.prop).length) this.items[model.name].properties = model.prop;
        Object.keys(model.const).map(k => this.items[model.name].const[k] = model.const[k]);
        return this;
    }

    setTraits (model) {
        if (Array.isArray(model.traits) && model.traits.length) {
            this.items[model.name].traits = model.traits;
        }
        return this;
    }

    setHidden (model) {
        if (Array.isArray(model.hidden) && model.hidden.length) {
            this.items[model.name].hidden = model.hidden;
        }
        return this;
    }

    setAppends (model) {
        if (Array.isArray(model.appends) && model.appends.length) {
            this.items[model.name].appends = model.appends;
        }
        return this;
    }

    setWiths (model) {
        if (Array.isArray(model.with) && model.with.length) {
            this.items[model.name].with = model.with;
        }
        if (Array.isArray(model.with_count) && model.with_count.length) {
            this.items[model.name].with_count = model.with_count;
        }
        return this;
    }

    setFields (model) {
        if (Array.isArray(model.fields) && model.fields.length) {
            this.items[model.name].fields = [];
            model.fields.map(f => {
                this.items[model.name].fields.push([
                    f.name, f.type, ...f.params, f.methods
                ]);
            })
        }
        return this;
    }

    setRules (model) {
        if (Array.isArray(model.rule) && model.rule.length) {
            this.items[model.name].rules = {};
            model.rule.map(f => {
                this.items[model.name].rules[f.name] = f.value.join('|')
            })
        }
        return this;
    }

    setSeeds (model) {
        if (model.factory_count && model.factory) {
            this.items[model.name].factory = {};
            model.factory.map(i => {
                this.items[model.name].factory[i.name] = i.value;
            });
            this.items[model.name].seed = "factory:"+model.factory_count;
        } else if (model.seed.length) {
            this.items[model.name].seed = model.seed;
        }
        return this;
    }

    setRelations (model) {
        if (Array.isArray(model.relations) && model.relations.length) {
            this.items[model.name].relations = {};
            model.relations.filter(f => !!f.model).map((f, i) => {
                let relation_key = i + "_" + f.model;
                this.items[model.name].relations[relation_key] = {
                    type: f.type
                }
                if (f.method) {
                    this.items[model.name].relations[relation_key].method = f.method;
                }
                if (f.related) {
                    this.items[model.name].relations[relation_key].related = f.related;
                }
                if (f.nullable) {
                    this.items[model.name].relations[relation_key].nullable = f.nullable;
                }
                if (!f.cascade_delete) {
                    this.items[model.name].relations[relation_key].cascade_delete = f.cascade_delete;
                }
                if (!f.cascade_update) {
                    this.items[model.name].relations[relation_key].cascade_update = f.cascade_update;
                }
            })
        }
        return this;
    }
}

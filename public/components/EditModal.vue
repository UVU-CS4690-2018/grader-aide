<template>
  <div :id="modalId" class="modal">
    <div class="modal-content">
      <h4>Edit Rules</h4>
      <table>
        <thead>
          <tr>
              <th>Points</th>
              <th>Rule</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="rule of editableRules" :key="rule.id">
            <td><input type="number" v-model="rule.pts" @blur="cleanRuleAfterEdit(rule)"></td>
            <td><input type="text" v-model="rule.desc" @blur="cleanRuleAfterEdit(rule)"></td>
          </tr>
          <tr>
            <td><input type="text"></td>
          </tr>
        </tbody>
      </table>

      <h4>Edit Comments</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat">Confirm</a>
    </div>
  </div>
</template>

<script>
module.exports = {
    props: {
        modalId: { type: String, required: true },
        rules: { type: Array, required: true }
        // coments: { type: Array, required: true },
    },
    data() {
        return {
            editableRules: [],
            editableComments: []
        };
    },
    methods: {
        deepCopy(arr) {
            return JSON.parse(JSON.stringify(arr));
        },
        // mutates rule in place
        cleanRuleAfterEdit(rule) {
            // clean pts
            // todo pts validation is not done yet but in progress
            // const invalidNumVal = /(?!(^-))\D+/g
            // const cleanPts = rule.pts.replace(invalidNumVal, '')
            // console.log(cleanPts)
            // rule.pts = parseInt(cleanPts)

            // clean rule
            rule.desc = rule.desc.trim().replace(/\s+/g, ' ');
            console.log(rule); // fixme remove
        }
    },
    created() {
        this.editableRules = this.deepCopy(this.rules);
    }
};
</script>

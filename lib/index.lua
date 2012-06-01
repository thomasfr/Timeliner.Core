local TOKEN_PREFIX = 'T:'
local SEARCH_PREFIX = 'S:'
local ACTIVETOKEN_PREFIX = 'AT:'
local NEW_SEARCH_EVENT_APPENDIX = ':NEW'
local tokens = cjson.decode(ARGV[2])
local tokenCount = table.getn(tokens)
local documentId = ARGV[1]
-- pushing documentId to the documents list
redis.call('LPUSH', 'DOCUMENTS', documentId)
local nextDocumentScore = redis.call('LLEN', 'DOCUMENTS')
-- indexing tokens
for i = 1, tokenCount do
    local searches = redis.call('SMEMBERS', ACTIVETOKEN_PREFIX .. tokens[i])
    local searchesCount = table.getn(searches)
    for j = 1, searchesCount do
        redis.call('ZADD', SEARCH_PREFIX .. searches[j], nextDocumentScore, documentId)
        redis.call('PUBLISH', SEARCH_PREFIX .. searches[j] .. NEW_SEARCH_EVENT_APPENDIX, documentId)
    end
    redis.call('ZADD', TOKEN_PREFIX .. tokens[i], nextDocumentScore, documentId)
end
return tokenCount